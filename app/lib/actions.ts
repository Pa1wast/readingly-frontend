"use server";

import { supabase } from "@/app/lib/supabase";
import { auth, signIn, signOut } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { use } from "react";

export async function getSetBookGenre(book, genres) {
  const subjects = book.subject;

  if (!subjects) return;

  let genre;
  for (const subject of subjects) {
    const normalizedSubject = subject.toLowerCase();

    genre = genres.find(
      (genre) => genre.name.toLowerCase() === normalizedSubject
    );

    if (!genre) {
      const { data, error } = await supabase
        .from("genres")
        .insert([{ name: normalizedSubject }])
        .select();

      if (error) {
        console.error("Error inserting genre:", error);
        throw new Error("Failed to insert genre");
      }

      genre = data?.[0];
    } else {
      break;
    }
  }

  return genre;
}

export async function getOriginalBook(id: string) {
  try {
    if (!id) return console.error("getBook requires an id");

    const response = await fetch(`http://localhost:8000/book/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching book:", error.message);
    return null;
  }
}

export async function getOriginalCover(
  id: string,
  size: "s" | "m" | "l" = "m"
) {
  try {
    if (!id) return console.error("getCover requires an id");

    const response = await fetch(
      `http://localhost:8000/cover/${id}?size=${size}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book cover");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching cover:", error.message);
    return null;
  }
}

export async function getOriginalBooks() {
  try {
    const response = await fetch("http://localhost:8000", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();

    const genres = await getGenres();

    const booksWithCovers = await Promise.all(
      data.map(async (book) => {
        const newBookFormat = {
          title: "",
          author: "",
          coverImg: "",
          genre: "",
          rating: [],
          reviews: [],
        };

        let coverImg;
        const coverId = book.cover_i;

        try {
          const cover = await getCover(coverId, "m");
          coverImg = cover.image_url;
        } catch {
          coverImg = null;
        }

        const genre = await getSetBookGenre(book, genres);

        book.coverImg = coverImg;
        newBookFormat.coverImg = coverImg;
        newBookFormat.author = book.author_name;
        newBookFormat.title = book.title;
        newBookFormat.genre = genre?.name;

        if (!newBookFormat.genre || !newBookFormat.coverImg) return book;

        const { error } = await supabase.from("books").insert([newBookFormat]);

        return book;
      })
    );

    return booksWithCovers;
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return null;
  }
}

// Auth

export async function signInAction() {
  await signIn("google", { redirectTo: "/mybooks" });
}

export async function signOutAction() {
  await signOut();
}

// Supabase

export async function getBooks() {
  const { data: books, error } = await supabase.from("books").select("*");

  if (error) console.error("Could not get books");

  return books;
}

export async function getUserBooks() {
  const userBooks = {
    cur: [],
    wantTo: [],
    read: [],
    notInterested: [],
  };

  const session = await auth();

  if (!session) return userBooks;

  const {
    currentlyReadingBooks,
    wantToReadBooks,
    readBooks,
    notInterestedBooks,
  } = session.user;

  try {
    const { data: books, error } = await supabase.from("books").select("*");

    if (error) {
      console.error("Could not get books:", error.message);
      return userBooks;
    }

    userBooks.cur = books.filter((book) =>
      currentlyReadingBooks.includes(book.id)
    );
    userBooks.wantTo = books.filter((book) =>
      wantToReadBooks.includes(book.id)
    );
    userBooks.read = books.filter((book) => readBooks.includes(book.id));
    userBooks.notInterested = books.filter((book) =>
      notInterestedBooks.includes(book.id)
    );

    return userBooks;
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return userBooks;
  }
}

export async function getBook(id) {
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.error("Could not get book");

  return book;
}

export async function createUser(newUser) {
  const { data: user, error } = await supabase
    .from("users")
    .insert([newUser])
    .single();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return user;
}

export async function getUser(email) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return user;
}

export async function getUserById(id) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return user;
}

export async function toggleBookShelf(formData) {
  const shelf = formData.get("shelf");
  const bookId = formData.get("book-id");

  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  if (!bookId || !shelf) return;

  const user = session.user;

  if (!user) return;

  try {
    const wantToReadBooks = user.wantToReadBooks || [];
    const currentlyReadingBooks = user.currentlyReadingBooks || [];
    const readBooks = user.readBooks || [];
    const notInterestedBooks = user.notInterestedBooks || [];

    const bookIdAsString = String(bookId);

    let updatedWantToRead = wantToReadBooks.filter(
      (id) => String(id) !== bookIdAsString
    );
    let updatedCurrentlyReading = currentlyReadingBooks.filter(
      (id) => String(id) !== bookIdAsString
    );
    let updatedReadBooks = readBooks.filter(
      (id) => String(id) !== bookIdAsString
    );
    let updatedNotInterestedBooks = notInterestedBooks.filter(
      (id) => String(id) !== bookIdAsString
    );

    if (
      shelf === "want-to-read" &&
      !updatedWantToRead.includes(bookIdAsString)
    ) {
      updatedWantToRead.push(bookIdAsString);
    } else if (
      shelf === "currently-reading" &&
      !updatedCurrentlyReading.includes(bookIdAsString)
    ) {
      updatedCurrentlyReading.push(bookIdAsString);
    } else if (shelf === "read" && !updatedReadBooks.includes(bookIdAsString)) {
      updatedReadBooks.push(bookIdAsString);
    } else if (
      shelf === "not-interested" &&
      !updatedNotInterestedBooks.includes(bookIdAsString)
    ) {
      updatedNotInterestedBooks.push(bookIdAsString);
    } else if (!["want-to-read", "currently-reading", "read"].includes(shelf)) {
      throw new Error(`Invalid shelf name: ${shelf}`);
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        want_to_read_books: updatedWantToRead,
        currently_reading_books: updatedCurrentlyReading,
        read_books: updatedReadBooks,
        not_interested_books: updatedNotInterestedBooks,
      })
      .eq("id", user.userId);

    if (updateError) {
      throw new Error(
        "Could not update user bookshelf: " + updateError.message
      );
    }

    revalidatePath("/");

    return {
      wantToReadBooks: updatedWantToRead,
      currentlyReadingBooks: updatedCurrentlyReading,
      readBooks: updatedReadBooks,
    };
  } catch (error) {
    console.error("Error updating bookshelf:", error.message);
    throw error;
  }
}

export async function removeFromAllShelves(formData) {
  const bookId = formData.get("book-id");

  if (!bookId) return;

  const bookIdAsString = String(bookId);

  const session = await auth();

  if (!session) redirect("/signin");

  const user = session.user;

  if (!user) return;

  try {
    const wantToReadBooks = user.wantToReadBooks || [];
    const currentlyReadingBooks = user.currentlyReadingBooks || [];
    const readBooks = user.readBooks || [];
    const notInterestedBooks = user.notInterestedBooks || [];

    const updatedWantToReadBooks = wantToReadBooks.filter(
      (id) => String(id) !== bookIdAsString
    );
    const updatedCurrentlyReadingBooks = currentlyReadingBooks.filter(
      (id) => String(id) !== bookIdAsString
    );
    const updatedReadBooks = readBooks.filter(
      (id) => String(id) !== bookIdAsString
    );
    const updatedNotInterestedBooks = notInterestedBooks.filter(
      (id) => String(id) !== bookIdAsString
    );

    const { error: updateError } = await supabase
      .from("users")
      .update({
        want_to_read_books: updatedWantToReadBooks,
        currently_reading_books: updatedCurrentlyReadingBooks,
        read_books: updatedReadBooks,
        not_interested_books: updatedNotInterestedBooks,
      })
      .eq("id", user.userId);

    if (updateError) {
      throw new Error(
        "Failed to update bookshelves in the database: " + updateError.message
      );
    }

    revalidatePath("/");

    return {
      wantToReadBooks: updatedWantToReadBooks,
      currentlyReadingBooks: updatedCurrentlyReadingBooks,
      readBooks: updatedReadBooks,
      notInterestedBooks: updatedNotInterestedBooks,
    };
  } catch (error) {
    console.error("Error removing book from all shelves:", error.message);
    throw error;
  }
}

export async function rateBook(bookId, rating) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  if (!bookId || rating < 0 || rating > 5) {
    throw new Error("Invalid book ID or rating");
  }

  const user = session.user;

  if (!user) return;

  try {
    const ratedBooks = user.ratedBooks || [];

    // Fetch the book from the database
    const { data: books, error: fetchBookError } = await supabase
      .from("books")
      .select("id, ratings")
      .eq("id", bookId)
      .single();

    if (fetchBookError) {
      throw new Error("Could not fetch book: " + fetchBookError.message);
    }

    const bookRatings = books?.ratings || [];

    const userRatingIndex = bookRatings.findIndex(
      (r) => r.userId === user.userId
    );

    if (rating === 0) {
      if (userRatingIndex !== -1) {
        bookRatings.splice(userRatingIndex, 1);
      }
    } else {
      if (userRatingIndex !== -1) {
        bookRatings[userRatingIndex].rating = rating;
      } else {
        bookRatings.push({ userId: user.userId, rating });
      }
    }

    const { error: updateBookError } = await supabase
      .from("books")
      .update({ ratings: bookRatings })
      .eq("id", bookId);

    if (updateBookError) {
      throw new Error(
        "Could not update book ratings: " + updateBookError.message
      );
    }

    const updatedRatedBooks = ratedBooks
      .map((book) => {
        if (book.bookId === bookId) {
          if (rating === 0) {
            return null;
          } else {
            return { ...book, rating: parseInt(rating, 10) };
          }
        } else {
          return book;
        }
      })
      .filter(Boolean);

    if (!updatedRatedBooks.some((book) => book.bookId === bookId)) {
      updatedRatedBooks.push({ bookId, rating: parseInt(rating, 10) });
    }

    const { error: updateUserError } = await supabase
      .from("users")
      .update({ rated_books: updatedRatedBooks })
      .eq("id", user.userId);

    if (updateUserError) {
      throw new Error(
        "Could not update user rated books: " + updateUserError.message
      );
    }

    revalidatePath("/");

    return {
      rated_books: updatedRatedBooks,
      book_ratings: bookRatings,
    };
  } catch (error) {
    console.error("Error updating ratings:", error.message);
    throw error;
  }
}

export async function addReview(formData) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const user = session.user;

  if (!user) return;

  const bookId = formData.get("book-id");
  const reviewText = formData.get("review");

  if (!bookId) {
    throw new Error("Invalid book ID or review text");
  }

  if (!reviewText || reviewText.trim() === "") return;

  try {
    const userReviews = user.reviews || [];

    const reviewIndex = userReviews.findIndex(
      (review) => review.bookId === bookId
    );

    if (reviewIndex !== -1) {
      userReviews[reviewIndex].text = reviewText;
    } else {
      userReviews.push({ bookId, text: reviewText });
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        reviews: userReviews,
      })
      .eq("id", user.userId);

    if (updateError) {
      throw new Error("Could not update user reviews: " + updateError.message);
    }

    const { data: books, error: bookError } = await supabase
      .from("books")
      .select("*")
      .eq("id", bookId)
      .single();

    if (bookError) {
      throw new Error("Could not fetch book: " + bookError.message);
    }

    const bookReviews = books.reviews || [];

    const bookReviewIndex = bookReviews.findIndex(
      (review) => review.userId === user.userId
    );

    if (bookReviewIndex !== -1) {
      bookReviews[bookReviewIndex].text = reviewText;
    } else {
      bookReviews.push({ userId: user.userId, text: reviewText });
    }

    const { error: bookUpdateError } = await supabase
      .from("books")
      .update({
        reviews: bookReviews,
      })
      .eq("id", bookId);

    if (bookUpdateError) {
      throw new Error(
        "Could not update book reviews: " + bookUpdateError.message
      );
    }

    revalidatePath("/");

    return {
      userReviews,
    };
  } catch (error) {
    console.error("Error adding review:", error.message);
    throw error;
  }
}

export async function getGenres() {
  const { data: genres, error } = await supabase.from("genres").select("*");

  if (error) console.error("Could not get genres");

  return genres;
}

export async function searchBooks(searchTerm) {
  if (!searchTerm) {
    return [];
  }

  try {
    const { data: books, error } = await supabase
      .from("books")
      .select("*")
      .ilike("title", `%${searchTerm}%`);

    if (error) {
      throw new Error("Error fetching books: " + error.message);
    }

    return books;
  } catch (error) {
    console.error("Error searching books:", error.message);
    throw error;
  }
}

export async function toggleGenre(genreId) {
  const session = await auth();

  if (!session) return;

  const userId = session.user.userId;

  if (!genreId || !userId) {
    console.error("Genre ID or User ID is missing");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("favourite_genres")
      .eq("id", userId)
      .single();

    if (error) throw error;

    const favouriteGenres = data?.favourite_genres || [];

    let updatedGenres;

    if (favouriteGenres.includes(genreId)) {
      updatedGenres = favouriteGenres.filter((id) => id !== genreId);
    } else {
      updatedGenres = [...favouriteGenres, genreId];
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ favourite_genres: updatedGenres })
      .eq("id", userId);

    if (updateError) throw updateError;

    revalidatePath("/mybooks");
  } catch (err) {
    console.error("Error toggling genre:", err.message);
  }
}

// Recommendations

export async function getHighlyRatedBooks() {
  const session = await auth();

  if (!session) return;

  const userId = session.user.userId;

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/recommend/highly-rated/${userId}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching highly-rated books:", error);
    throw error;
  }
}

export async function getFavouriteGenresBooks() {
  const session = await auth();

  if (!session) return;

  const userId = session.user.userId;

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/recommend/favourite-genres/${userId}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching favourite-genres books:", error);
    throw error;
  }
}

export async function getBasedOnReadBooks() {
  const session = await auth();

  if (!session) return;

  const userId = session.user.userId;

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/recommend/similar-to-read/${userId}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching favourite-genres books:", error);
    throw error;
  }
}
