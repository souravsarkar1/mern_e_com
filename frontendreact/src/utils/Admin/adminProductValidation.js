export const validateProductData = (toast,productData ) => {
    const { name, description, price, category, Stock, images } = productData;
  
    if (!name || !description || !price || !category || !Stock || images.some(image => !image.public_id || !image.url)) {
      // If any of the required fields are empty
      toast({
        title: "Validation Error",
        description: "Please fill in all the required fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position : "top"
      });
      return false;
    }
  
    return true;
  };
  