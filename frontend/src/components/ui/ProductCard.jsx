import React, { useState } from 'react'
import{EditIcon,DeleteIcon} from '@chakra-ui/icons'
import { Container, Heading, useColorModeValue, VStack,Box, Image, Text, HStack,IconButton,useDisclosure,Input } from '@chakra-ui/react';
import { useProductStore } from '../../Store/Product';
import { useToast,Button } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export const ProductCard = ({product}) => {
  const [updatedProduct,setUpdatedProduct]=useState(product);
  const textcolor= useColorModeValue("gray.600","gray.200");
   const bg= useColorModeValue("white","gray.800");
 const { isOpen, onOpen, onClose } = useDisclosure()
const toast =useToast();

const{deleteProduct}=useProductStore()
const handleProductDelete = async (pid)=>{
 const {success,message}= await deleteProduct(pid);
  if(!success){
     toast({
      title :"Error",
      description:message,
      status:"error",
      duration: 5000,
      isClosable: true
     })
  }
  else{
    toast({
     title :"success",
      description:message,
      status:"success",
      duration: 5000,
      isClosable: true
  })}
  console.log({success,message});
}
const{updateproduct}=useProductStore();
const handleUpdateProduct = async (pid,updatedProduct)=>{
    const{success,message}=await updateproduct(pid,updatedProduct);
    onClose();
    if(!success){
         toast({
      title :"Error",
      description:message,
      status:"error",
      duration: 5000,
      isClosable: true
     })
  }
  else{
    toast({
     title :"success",
      description:"Updated",
      status:"success",
      duration: 5000,
      isClosable: true
  })}
}
  return (
   <Box shadow='lg'
   rounded='lg'
   overflow='hidden'
   transition='all 0.3s'
   _hover={{ transform: "translateY(-5px)", shadow: "x1"}}
   bg={bg}
   >
    <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
     <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
            {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='x1' color={textcolor} mb={4}>
            {product.price}
        </Text>
        <HStack spacing={2}>
            <IconButton icon={<EditIcon/>} onClick={onOpen} colorscheme='blue'/>
            <IconButton icon={<DeleteIcon/>} onClick={()=>{handleProductDelete(product._id)}}  colorscheme='blue'/>

        </HStack>
     </Box>
       <Modal isOpen={isOpen} onClose={onClose}>
     <ModalOverlay/>
      <ModalContent>
        <ModalHeader> Update product</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
            <VStack spacing={4}>
                <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})}
                />
                  <Input
                placeholder='Price'
                name='price'
                type='number'
               value={updatedProduct.price}
               onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}
                />
                <Input
                placeholder='Image Url'
                name='image'
               value={updatedProduct.image}
                onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}
                />
              
                
            </VStack>
        </ModalBody>
        <ModalFooter>
            <Button colorscheme='blue' mr={3} onClick={()=>{handleUpdateProduct(product._id,updatedProduct)}}>
                Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
                Cancel
            </Button>
        </ModalFooter>
      </ModalContent>


        </Modal>
    
   </Box>
  )
};
