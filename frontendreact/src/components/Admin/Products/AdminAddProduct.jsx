import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Box,
  InputGroup,
  InputRightElement,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { adminAddProduct } from '../../../redux/Admin/action';
import { validateProductData } from '../../../utils/Admin/adminProductValidation';
import { getAllProducts } from '../../../redux/Products/action';

const AdminProductUpload = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    ratings: 0,
    category: '',
    images: [
      {
        public_id: '',
        url: '',
      },
    ],
    Stock: 0,
  });
const dispath = useDispatch();
const token = useSelector(st=>st.authReducer.adminToken);
const toast = useToast();
  const handleInputChangeText = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Copy the array and update the specific image object
    const updatedImages = [...productData.images];
    updatedImages[index] = {
      ...updatedImages[index],
      [name]: value,
    };

    setProductData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleAddMore = () => {
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, { public_id: '', url: '' }],
    }));
  };

  const handleRemove = () => {
    if (productData.images.length > 1) {
      setProductData((prevData) => {
        const updatedImages = [...prevData.images];
        updatedImages.pop(); // Remove the last image
        return { ...prevData, images: updatedImages };
      });
    }
  };

  const handleUpload = () => {
    console.log(productData); // Replace with actual API call to upload data
    const flag = validateProductData(toast, productData);
    if (flag) {
      dispath(adminAddProduct(productData,token,toast)).then((res)=>{
        dispath(getAllProducts());
      })
    }
  };

  return (
    <Box
      p={6}
      w={"700px"}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      mx="auto"
      mt={8}
    >
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input type="text" name="name" value={productData.name} onChange={handleInputChangeText} />
        </FormControl>

        <FormControl>
          <FormLabel>Product Description</FormLabel>
          <Textarea name="description" value={productData.description} onChange={handleInputChangeText} />
        </FormControl>

        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <InputGroup>
            <Input type="number" name="price" value={productData.price} onChange={handleInputChangeText} />
            <InputRightElement children="$" />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Product Category</FormLabel>
          <Select name="category" value={productData.category} onChange={handleInputChangeText}>
            <option value={"Electronics"}>Electronics</option>
            <option value={"Laptop"}>Laptop</option>
            <option value={"T-Shirt"}>T-Shirt</option>
            <option value={"Grocery"}>Grocery</option>
            <option value={"Shoes"}>Shoes</option>
            <option value={"Watch"}>Watch</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Product Stock</FormLabel>
          <Input type="number" name="Stock" value={productData.Stock} onChange={handleInputChangeText} />
        </FormControl>

        {productData.images.map((image, index) => (
          <div key={index}>
            <FormControl>
              <FormLabel>{`Image ${index + 1} Public ID`}</FormLabel>
              <Input
                type="text"
                name="public_id"
                value={image.public_id}
                onChange={(e) => handleInputChange(e, index)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{`Image ${index + 1} URL`}</FormLabel>
              <Input
                type="text"
                name="url"
                value={image.url}
                onChange={(e) => handleInputChange(e, index)}
              />
            </FormControl>
          </div>
        ))}

        <Flex alignItems={"center"} gap={4}>
          <Button colorScheme='teal' onClick={handleAddMore}>Add More</Button>
          <Button colorScheme='red' onClick={handleRemove}>Remove</Button>
        </Flex>

        <Button colorScheme="teal" onClick={handleUpload} mt={4}>
          Upload Product
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminProductUpload;
