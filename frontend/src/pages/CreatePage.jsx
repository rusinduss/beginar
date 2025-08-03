import { Container, Heading, useColorModeValue, VStack,Box, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../Store/Product';
import { useToast } from '@chakra-ui/react'

const Createpage = () => {
  const [newProduct,setNewproduct]=useState({
    name:"",
    price:"",
    image:""

  });
  const {createProducts}=useProductStore();
  const toast=useToast();
  const handleSubmit=async()=>{
    const{success,message}=await createProducts(newProduct);
     if(!success){
     toast({
      title :"Error",
      description:message,
      status:"error",
      duration: 5000,
      isCloseble: true
     })
  }
  else{
    toast({
     title :"success",
      description:message,
      status:"success",
      duration: 5000,
      isCloseble: true
  })}
  setNewproduct({name:"",price:"",image:""})
}
 
  return (
    <Container maxW={"container.sm"}>
      <VStack
       spacing={8}
       >
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white","gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e)=>setNewproduct({...newProduct, name:e.target.value})}/>
            <Input placeholder='Price'
            name='price'
            value={newProduct.price}
            onChange={(e)=>setNewproduct({...newProduct, price:e.target.value})}/>
            <Input placeholder='Image'
            name='image'
            value={newProduct.image}
            onChange={(e)=>setNewproduct({...newProduct, image:e.target.value})}/>

            <Button colorScheme='blue' onClick={handleSubmit} w='full'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Createpage