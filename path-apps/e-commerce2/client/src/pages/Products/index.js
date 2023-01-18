import React from 'react'
import Card from '../../components/Card'
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from 'react-query'


function Products() {
    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status, } = useInfiniteQuery('products', ({ pageParam = 0 }) =>
            fetch('http://localhost:4000/product?page=' + pageParam).then(res =>
                res.json()
            ),
            {
                getNextPageParam: (lastGroup, allGroups) => {
                    const morePagesExist = lastGroup?.length === 12;
                    if (!morePagesExist) {
                        return
                    }
                    return allGroups.length + 1;
                },
            }
        )

    if (status === "loading") return 'Loading...'

    if (status === "error") return 'An error has occurred: ' + error.message

    console.log(data);
    return (

        <div>
            <Grid templateColumns='repeat(4, 1fr)' gap={5}>
                {/* {
                data.map((item,id) => <Card key={id} item={item} />)
            } */}
                {
                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {
                                group.map((item) => (
                                    <Box w="%100" key={item._id}>
                                        <Card item={item} />
                                    </Box>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>

            <Flex mt="10" justifyContent="center">
                <Button
                    isLoading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>
            </Flex>

        </div>
    )
}

export default Products