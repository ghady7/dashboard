CREATE DATABASE library_system;

USE library_system;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    genre VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('available', 'checked_out', 'reserved') NOT NULL DEFAULT 'available'
);

INSERT INTO books (title, author, published_date, genre, price, status) 
VALUES 
('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16', 'Fiction', 12.99, 'available'),
('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 'Fiction', 15.50, 'checked_out'),
('1984', 'George Orwell', '1949-06-08', 'Dystopian', 10.99, 'reserved'),
('Pride and Prejudice', 'Jane Austen', '1813-01-28', 'Romance', 9.99, 'available'),
('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 'Classic', 14.99, 'available'),
('Moby-Dick', 'Herman Melville', '1851-10-18', 'Adventure', 18.25, 'checked_out'),
('War and Peace', 'Leo Tolstoy', '1869-01-01', 'Historical', 22.99, 'reserved'),
('The Hobbit', 'J.R.R. Tolkien', '1937-09-21', 'Fantasy', 16.75, 'available'),
('Crime and Punishment', 'Fyodor Dostoevsky', '1866-01-01', 'Psychological', 13.50, 'available'),
('Brave New World', 'Aldous Huxley', '1932-01-01', 'Dystopian', 11.25, 'checked_out'),
('The Road', 'Cormac McCarthy', '2006-09-26', 'Post-Apocalyptic', 14.99, 'reserved'),
('The Alchemist', 'Paulo Coelho', '1988-01-01', 'Philosophical', 10.99, 'available'),
('Dune', 'Frank Herbert', '1965-08-01', 'Science Fiction', 19.99, 'checked_out'),
('The Shining', 'Stephen King', '1977-01-28', 'Horror', 17.50, 'available'),
('Fahrenheit 451', 'Ray Bradbury', '1953-10-19', 'Dystopian', 12.99, 'reserved'),
('Wuthering Heights', 'Emily Brontë', '1847-12-01', 'Gothic', 9.75, 'available'),
('Jane Eyre', 'Charlotte Brontë', '1847-10-16', 'Classic', 11.50, 'checked_out'),
('The Picture of Dorian Gray', 'Oscar Wilde', '1890-07-01', 'Philosophical', 10.25, 'available'),
('Dracula', 'Bram Stoker', '1897-05-26', 'Horror', 14.25, 'reserved'),
('The Brothers Karamazov', 'Fyodor Dostoevsky', '1880-01-01', 'Philosophical', 20.50, 'available'),
('Les Misérables', 'Victor Hugo', '1862-04-03', 'Historical', 18.99, 'checked_out'),
('The Count of Monte Cristo', 'Alexandre Dumas', '1844-08-28', 'Adventure', 21.75, 'available'),
('Frankenstein', 'Mary Shelley', '1818-01-01', 'Science Fiction', 13.25, 'reserved'),
('The Lord of the Rings', 'J.R.R. Tolkien', '1954-07-29', 'Fantasy', 25.99, 'available'),
('A Tale of Two Cities', 'Charles Dickens', '1859-04-30', 'Historical', 12.50, 'available'),
('Murder on the Orient Express', 'Agatha Christie', '1934-01-01', 'Mystery', 14.75, 'checked_out'),
('One Hundred Years of Solitude', 'Gabriel García Márquez', '1967-05-30', 'Magical Realism', 16.25, 'reserved'),
('The Grapes of Wrath', 'John Steinbeck', '1939-04-14', 'Historical', 17.99, 'available'),
('Slaughterhouse-Five', 'Kurt Vonnegut', '1969-03-31', 'Satire', 15.50, 'checked_out'),
('The Handmaid’s Tale', 'Margaret Atwood', '1985-08-17', 'Dystopian', 13.99, 'available');
