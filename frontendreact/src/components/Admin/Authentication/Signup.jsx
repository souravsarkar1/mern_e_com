import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { adminRegister } from '../../../redux/Authentication/action'
import { Link } from 'react-router-dom'

export default function AdminSignup() {
  const [showPassword, setShowPassword] = useState(false)
const [formData, setFormData] = useState({
  email : "",
  password : "",
  role : "admin",
  firstName : "",
  lastName : "",
})
const dispatch = useDispatch();
const toast = useToast();
const handleOnChange =(e)=>{
const {name, value} = e.target;
  setFormData(pre=>({...pre,[name]: value}))
}

const handleSubmit = ()=>{
  const newData = {
    name : formData.firstName +" "+ formData.lastName,
    email : formData.email,
    password : formData.password,
    role : formData.role
  }
  console.log({formData});
  dispatch(adminRegister(newData, toast)).then((res)=>{
    
  })
}
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input onChange={handleOnChange} type="text" value={formData.firstName}  name='firstName'/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input onChange={handleOnChange} type="text" value={formData.lastName} name='lastName'/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input onChange={handleOnChange} type="email" value={formData.email} name="email"/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input onChange={handleOnChange} value={formData.password} name='password' type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already Have An Admin Account? <Link color={'blue.400'} to={'/admin/login'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}