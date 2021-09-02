// toggler
const toggleSearch = displayStyle => {
  document.getElementById("searched").style.display = displayStyle;
};
const toggleSpinner = displayStyle => {
  document.getElementById('toggle-spin').style.display = displayStyle;
}
const toggleBody = displayStyle => {
  document.getElementById('books-section').style.display = displayStyle;
}


// get and decode the url
const getBooks = async () => {
  toggleSpinner('block');
  toggleBody('none');

  const input = document.getElementById("search-input");
  const value = input.value;

  const url = `https://openlibrary.org/search.json?q=${value}`;
  const res = await fetch(url);
  const data = await res.json();
  // clear the input 
  input.value = "";

    // checking length 
  if (data.docs.length === 0) {
    document.getElementById("total-books").innerText = "No";
    document.getElementById("searched").style.backgroundColor = "#f8d7da";
    document.getElementById("searched").style.color = "#842029";
    toggleBody("block");
    toggleSpinner("none");
  } else {
    document.getElementById("total-books").innerText = data.numFound;
    document.getElementById("searched").style.backgroundColor = "#d1e7dd";
    document.getElementById("searched").style.color = "#0f5132";
  }

  toggleSearch("block");
  displayBooks(data.docs);
};

// display items to booksContainer
const displayBooks = (books) => {
  const booksContainer = document.getElementById("books-container");
  booksContainer.textContent = "";

  books.forEach((book) => {
    // creating and append a div 
    const div = document.createElement("div");
    div.classList.add("col");
    const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    div.innerHTML = `
                    <div class="card border border-2 border-dark">
                        <img src="${url}" class="card-img-top" alt="image of a reading book">
                        <div class="card-body bg-info">
                            <h5 class="card-title">${book.title ? book.title : "Unknown Name"}</h5>
                            <p class="author card-text">Author : ${book.author_name? book.author_name: "Unknown Author"}</p>
                            <p class="card-text">First Published : ${book.first_publish_year
                                ? book.first_publish_year: "Unknown Year"}</p>
                            <p class="card-text">Publisher : ${book.publisher[0]
                                ? book.publisher[0].slice(0, 14): "Unknown Year"}</p>
                        </div>
                    </div>
        `;
    booksContainer.appendChild(div);
    toggleSpinner('none');
    toggleBody('block');
  });
};