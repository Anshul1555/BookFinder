import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries.js';
import { DELETE_BOOK } from '../utils/mutations.js';
import { removeBookId } from '../utils/localStorage.js';

interface MeData {
  me: {
    _id: string;
    username: string;
    email: string;
    savedBooks: {
      bookId: string;
      title: string;
      authors: string[];
      description?: string;
      image?: string;
      link?: string;
    }[];
  };
}


const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  console.log('SavedBooks data:', data);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    update(cache, { data }) {
      if (!data?.deleteBook) return;
  
      // Read the current GET_ME result from the cache
      const existing = cache.readQuery<MeData>({ query: GET_ME });
  
      if (existing && existing.me) {
        cache.writeQuery<MeData>({
          query: GET_ME,
          data: {
            me: {
              ...existing.me,
              savedBooks: data.deleteBook.savedBooks,
            },
          },
        });
      }
    },
  });
  

  const userData = data?.me || { savedBooks: [] };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook({
        variables: { bookId },
      });
      
      removeBookId(bookId);       
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading user data!</h2>;

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: any) => (
            <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
