import React, { useEffect } from 'react';
import { Text,Container, Heading, VStack,Box, Input, Button, SimpleGrid } from '@chakra-ui/react';
import CreatePage from './CreatePage';
import {Link} from "react-router-dom";
import { useProductStore } from '../Store/Product';
import { ProductCard } from '../components/ui/ProductCard';

const Homepage = () => {
  const {fetchProducts,products}=useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts])
  console.log("products",products)
  return (
    <Container maxW='container.x1' py={12}>
      <VStack spacing={8}>
        <Text
        fontSize={"30"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r,cyan.400,blue.500)"}
        bgClip={"text"}
        textAlign={"center"}>
          Current Products
        </Text>
        {products.length===0 &&   <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No Products Found
          <Link to={"/CreatePage"}>
          <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}> Create a Product </Text></Link>
        </Text>}
        <SimpleGrid          
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}>
            {products.map((product) =>(
              <ProductCard key={product._id} product={product} />
            ))}
        </SimpleGrid>

      </VStack>
    </Container>
  )
}

export default Homepage;