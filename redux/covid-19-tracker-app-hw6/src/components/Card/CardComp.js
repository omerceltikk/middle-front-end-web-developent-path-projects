import React, { useEffect } from 'react'
import { Card, CardBody, Grid, GridItem, Text, CardHeader, Heading } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import Error from '../Error';
function CardComp() {
    const countryInfo = useSelector(state => state.data.items);
    const dataStatus = useSelector(state => state.data.status);

    // const countrySlug = useSelector(state => state.data.slug)
    // console.log(countryInfo);
    // console.log(countrySlug.country);

    useEffect(() => {
        console.log(countryInfo);
    }, [countryInfo])

    if (dataStatus === "loading") {
        return <Loading />
    }

    if (dataStatus === "failed") {
        return <Error />
    }
    return (

        <div>
            {dataStatus === "succeeded" ?
                <Grid m={10} templateColumns='repeat(4, 1fr)' gap={12}>
                    <GridItem>
                        <Card backgroundColor="#C0DEFF" m={5} colorScheme="blue">
                            <CardHeader>
                                <Text fontSize="3xl" m={3} >Infected</Text>
                                <Text fontSize="xl" m={5} as="b">Total Confirmed: <br></br>{countryInfo.TotalConfirmed.toLocaleString()} </Text>
                            </CardHeader>
                            <CardBody m={5}>
                                <Text m={5} >Last Updated At: <br></br> {countryInfo.Date}</Text>
                            </CardBody>
                            <Text m={5} as="i">Number of Total Confirmed of Covid-19</Text>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card backgroundColor="#FF7D7D" m={5}  >
                            <CardHeader>
                                <Text fontSize="3xl" m={3}>Deaths</Text>
                                <Text  fontSize="xl" m={5} as="b">Total Deaths: <br></br>{countryInfo.TotalDeaths.toLocaleString()} </Text>
                            </CardHeader>
                            <CardBody m={5}>
                                <Text m={5} >Last Updated At: <br></br> {countryInfo.Date}</Text>
                            </CardBody>
                            <Text m={5} as="i">Number of Total Deaths of Covid-19</Text>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card backgroundColor="#BCE29E" m={5} >
                            <CardHeader>
                                <Text fontSize="3xl" m={3} >Recovered</Text>
                                <Text  fontSize="xl" m={5} as="b">Total Recovered: <br></br>{(Number(countryInfo.TotalConfirmed) - Number(countryInfo.TotalDeaths)).toLocaleString() } </Text>
                            </CardHeader>
                            <CardBody m={5}>
                                <Text  m={5}>Last Updated At: <br></br> {countryInfo.Date}</Text>
                            </CardBody>
                            <Text  m={5} as="i">Number of Total Recovered of Covid-19</Text>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card backgroundColor="#BCE29E" m={5} >
                            <CardHeader>
                                <Text fontSize="3xl" m={3} >Active</Text>
                                <Text  fontSize="xl" m={5} as="b">Active: <br></br>{countryInfo.NewConfirmed.toLocaleString()} </Text>
                            </CardHeader>
                            <CardBody m={5}>
                                <Text  m={5}>Last Updated At: <br></br> {countryInfo.Date}</Text>
                            </CardBody>
                            <Text  m={5} as="i">Number of Total Active of Covid-19</Text>
                        </Card>
                    </GridItem>
                </Grid>
                : <Loading />}
        </div>
    )
}

export default CardComp