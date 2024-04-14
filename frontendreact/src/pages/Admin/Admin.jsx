import React from 'react'
import AdminTable from '../../components/Admin/Products/AdminTable'
import { Box, Button, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <Box mt={10}>
    <Center>
<Link to={"/admin/product/upload"}><Button colorScheme='green'>Add New Product</Button></Link>
    </Center>
    <AdminTable/>
    </Box>
  )
}

export default Admin