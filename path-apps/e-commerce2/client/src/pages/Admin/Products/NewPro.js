import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Formik, FieldArray } from "formik"
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import { updateProduct } from '../../../api'
import validationSchema from './validations'
import { message } from 'antd'
import { postProduct } from '../../../api'

function NewProducts() {
    const queryClient = useQueryClient()

    const NewProductsMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries
    })

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: "product_update" })
        console.log(values);

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
        }

        NewProductsMutation.mutate(newValues,{
            onSuccess: () => message.success({
                content:"New Procudt Added.",
                key:"product_new",
                duration:"2"
            })
        } )
     }

    return (
        <div>
            <Text fontSize="2xl">New Product</Text>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    price: "",
                    photos: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
                        <>
                            <Box>
                                <Box my="5" textAlign="left">
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                name="title" onChange={handleChange} onBlur={handleBlur} value={values.title}
                                                disabled={isSubmitting} isInvalid={(touched.title && errors.title)}
                                            />
                                            {touched.title && errors.title && (
                                                <Text color="red.500">{errors.title}</Text>
                                            )}
                                        </FormControl>
                                        <FormControl mt="4">
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                name="description" onChange={handleChange} onBlur={handleBlur} value={values.description}
                                                disabled={isSubmitting} isInvalid={(touched.description && errors.description)}
                                            />
                                            {touched.description && errors.description && (
                                                <Text color="red.500">{errors.description}</Text>
                                            )}
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Price</FormLabel>
                                            <Input
                                                name="price" onChange={handleChange} onBlur={handleBlur} value={values.price}
                                                disabled={isSubmitting} isInvalid={(touched.price && errors.price)}
                                            />
                                            {touched.price && errors.price && (
                                                <Text color="red.500">{errors.price}</Text>
                                            )}
                                        </FormControl>

                                        <FormControl mt="4">
                                            <FormLabel>Photos</FormLabel>
                                            <FieldArray
                                                name="photos"
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {
                                                            values.photos && values.photos.map((photo, index) => (
                                                                <div key={index}>
                                                                    <Input
                                                                        name={`photos.${index}`}
                                                                        value={photo}
                                                                        disabled={isSubmitting}
                                                                        onChange={handleChange}
                                                                        width="3xl" />
                                                                    <Button
                                                                        type="button"
                                                                        colorScheme="red"
                                                                        ml="4"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >Remove</Button>
                                                                </div>
                                                            ))
                                                        }

                                                        <Button mt="5" onClick={() => arrayHelpers.push()}>
                                                            Add a photo
                                                        </Button>
                                                    </div>
                                                )} />

                                        </FormControl>

                                        <Button mt="4" width="full" type='submit' isLoading={isSubmitting}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                    )

                }
            </Formik>
        </div>
    )
}

export default NewProducts