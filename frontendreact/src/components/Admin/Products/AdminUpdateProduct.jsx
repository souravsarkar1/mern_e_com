import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../../redux/Products/action';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import { updateProduct } from '../../../redux/Admin/action';

const AdminUpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.producdtReducer.singleProduct);
  const [product, setProduct] = useState({ ...singleProduct });
  const token = useSelector(st=>st.authReducer.token);
  const toast = useToast();
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct({ ...singleProduct });
  }, [singleProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (index, e) => {
    const newImages = [...product.images];
    newImages[index].url = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, images: newImages }));
  };

  const handleReviewChange = (index, key, e) => {
    const newReviews = [...product.reviews];
    newReviews[index][key] = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, reviews: newReviews }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
   dispatch(updateProduct(id, product, token, toast  ))
  };

  return (
    <Box mt={100}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={product.name} onChange={handleInputChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={product.description} onChange={handleInputChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Price</FormLabel>
          <Input type="number" name="price" value={product.price} onChange={handleInputChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Input type="text" name="category" value={product.category} onChange={handleInputChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Stock</FormLabel>
          <Input type="number" name="Stock" value={product.Stock} onChange={handleInputChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Images</FormLabel>
          {product.images.map((image, index) => (
            
            <Input
              key={index}
              type="text"
              value={image.url}
              onChange={(e) => handleImageChange(index, e)}
              placeholder={`Image URL ${index + 1}`}
              mt={2}
            />
          ))}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Reviews</FormLabel>
          {product.reviews.map((review, index) => (
            <div key={index}>
              <Input
                type="text"
                value={review.name}
                onChange={(e) => handleReviewChange(index, 'name', e)}
                placeholder={`Review ${index + 1} Name`}
              />
              <Input
                type="number"
                value={review.rating}
                onChange={(e) => handleReviewChange(index, 'rating', e)}
                placeholder={`Review ${index + 1} Rating`}
              />
              <Textarea
                value={review.comment}
                onChange={(e) => handleReviewChange(index, 'comment', e)}
                placeholder={`Review ${index + 1} Comment`}
              />
            </div>
          ))}
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Update Product
        </Button>
      </form>
    </Box>
  );
};

export default AdminUpdateProduct;
