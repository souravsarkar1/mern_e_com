import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Image,
  Center,
  Text,
  Divider,
  Button,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/Products/action';
import PopUp from '../../Modal/Popup';
import { deleteProduct } from '../../../redux/Admin/action';
import Popup from '../../Modal/Popup';
import { Link } from 'react-router-dom';
import PaginationAllPage from '../../Pagination/PaginationAllPage';
const AdminTable = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(st => st.producdtReducer.allProducts);
  const toekn = useSelector(st => st.authReducer.toekn);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  useEffect(() => {
    const calculateTotalPages = () => {
      const itemsPerPage = 10; // Assuming 10 items per page
      return Math.ceil(allProducts.length / itemsPerPage);
    };
    setTotalPages(calculateTotalPages());
  }, [dispatch, allProducts.length]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDeleteProduct = id => {
    dispatch(deleteProduct(id, toekn, toast)).then(res => {
      dispatch(getAllProducts());
    });
  };
  return (
    <Box mt={10}>
      <Center>
        <TableContainer ml={'00px'}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Sl No.</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Ratings</Th>
                <Th>Images</Th>
                <Th>Category</Th>
                <Th>Stock</Th>
                <Th>Number Of Reviews</Th>
                <Th>Reviews</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(allProducts) &&
                allProducts.length > 0 &&
                allProducts?.map((item, index) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Box h={100} w={150} overflowX="auto" maxHeight={100}>
                        <Text fontSize="md" lineHeight="tall">
                          {item.name}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box h={100} w={150} overflowX="auto" maxHeight={100}>
                        <Text fontSize="md" lineHeight="tall">
                          {item.description}
                        </Text>
                      </Box>
                    </Td>
                    <Td>{item.price}</Td>
                    <Td>{item.ratings}</Td>
                    <Td>
                      {
                        <PopUp
                          modalTitle={'See All Image'}
                          colorofModal={'green'}
                          children={item.images?.map(item => (
                            <Center>
                              <Image m={3} p={3} h={200} w={300} src={item.url} alt={item.public_id} />
                            </Center>
                          ))}
                        />
                      }
                    </Td>
                    <Td>{item.category}</Td>
                    <Td>{item.Stock}</Td>
                    <Td>{item.numOfReviews}</Td>
                    <Td>
                      <PopUp
                        modalTitle={'See Reviwes'}
                        colorofModal={'green'}
                        children={
                          Array.isArray(item.reviews) &&
                          item.reviews?.map(review => (
                            <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
                              <Text fontWeight="bold">{review.name}</Text>
                              <Text color="gray.500">Rating: {review.rating}</Text>
                              <Divider my={2} />
                              <Text>{review.comment}</Text>
                            </Box>
                          ))
                        }
                      />
                    </Td>
                    <Td>
                      <PopUp
                        modalTitle={'Update'}
                        children={
                          <Flex justifyContent={'center'} flexDirection={'column'}>
                            <Text>Are You Want To Update the Data?</Text>
                            <Link to={`/admin/product/${item._id}`}>
                              <Button colorScheme="green">Ok</Button>
                            </Link>
                          </Flex>
                        }
                      />
                    </Td>
                    <Td>
                      <Popup
                        modalTitle={'Delete'}
                        colorofModal={'red'}
                        children={
                          <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                            <Text as={'h6'}>Are You Sure To Delete?</Text>
                            <Button m={10} colorScheme="red" onClick={() => handleDeleteProduct(item._id)}>
                              Delete
                            </Button>
                          </Flex>
                        }
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
      <PaginationAllPage currentPage={page} totalPages={totalPages} handlePageChange={setPage} />
    </Box>
  );
};

export default AdminTable;
