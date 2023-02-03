import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Product } from '../interfaces';
import {
  CircularProgress,
  Button,
  VStack,
  Center,
  Flex,
  Spacer,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const Proposals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()


  useEffect(() => {
    const fetchProducts = () => {
      fetch('http://localhost:4000/api')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        });
    };
    fetchProducts();
  }, []);

  const handleBidBtn = (product: Product) =>
    router.push(`/products/bid/${product.name}/${product.price}`);

  return (
    <>
      <VStack
        spacing={4}
        align='stretch'
      >
        <Flex mt={10}>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Last Bidder</Th>
                <Th>Creator</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            {/* Data for display, we will later get it from the server */}
            <Tbody>
              {loading ? (
                <CircularProgress isIndeterminate color='green.300' />

              ) : products.map((product: Product) => {

                return (
                  <Tr key={product.id}>
                    <Td>{product.name}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.last_bidder}</Td>
                    <Td>{product.owner}</Td>
                    <Td>
                      <Button colorScheme='green' onClick={() => handleBidBtn(product)}>Edit</Button>
                    </Td>
                  </Tr>)
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex justifyContent="center" mt={10}>
          <Button colorScheme='blue'>
            <Link href="/products/add" >
              Add Products
            </Link>
          </Button>

        </Flex>
      </VStack>

    </>
  )
}
export default Proposals