import React from 'react';
import { VStack, Input, Button, Checkbox, Icon, Text, Link, Box, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Função para validar CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Função para normalizar o CEP
function normalizeCep(cep) {
    return cep.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
}

function normalizeDocument(document) {
    return document.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
}

// Esquema de validação Yup
const signUpValidationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Somente alfabetos são permitidos para este campo")
        .required('Nome é obrigatório'),
    surName: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Somente alfabetos são permitidos para este campo")
        .required('Sobrenome é obrigatório'),
    email: Yup.string()
        .email('Por favor insira um email válido')
        .required('Email é obrigatório'),
    pwd: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
    regNum: Yup.string()
        .required('Documento é obrigatório')
        .test('is-cpf', 'CPF inválido', value => validateCPF(value)),
    cep: Yup.string()
        .required('CEP é obrigatório'),
    state: Yup.string()
        .required('Estado é obrigatório'),
    city: Yup.string()
        .required('Cidade é obrigatória'),
    neighborhood: Yup.string()
        .required('Bairro é obrigatório'),
    street: Yup.string()
        .required('Rua é obrigatória'),
    number: Yup.string()
        .required('Número é obrigatório'),
    complement: Yup.string()
});

const SignUpScreen = () => {
    const navigation = useNavigation();
    const toast = useToast();

    const fetchAddress = async (cep, setFieldValue) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${normalizeCep(cep)}/json/`);
            const { uf, localidade, bairro, logradouro } = response.data;
            setFieldValue('state', uf);
            setFieldValue('city', localidade);
            setFieldValue('neighborhood', bairro);
            setFieldValue('street', logradouro);
        } catch (error) {
            toast.show({
                description: "Falha ao buscar o endereço.",
                status: "error",
                duration: 3000
            });
            console.error(error);
        }
    };

    const handleCepBlur = (handleBlur, cep, setFieldValue) => {
        handleBlur('cep');
        fetchAddress(cep, setFieldValue);
    };

    return (
        <Formik
            initialValues={{
                name: '', surName: '', email: '', pwd: '', regNum: '',
                cep: '', state: '', city: '', neighborhood: '', street: '', complement: '', number: ''
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={async (values) => {
                const normalizedValues = {
                    name: values.name,
                    surName: values.surName,
                    email: values.email,
                    pwd: values.pwd,
                    regNum: normalizeDocument(values.regNum),
                    address: {
                        userRegistrationNumber: normalizeDocument(values.regNum),
                        cep: normalizeCep(values.cep),
                        state: values.state,
                        city: values.city,
                        neighborhood: values.neighborhood,
                        street: values.street,
                        number: values.number,
                        complement: values.complement
                    }
                };
                try {
                    await registerUser(normalizedValues);
                    toast.show({
                        description: "Usuário cadastrado com sucesso.",
                        status: "success",
                        duration: 3000
                    });
                    navigation.navigate('Login');
                } catch (error) {
                    toast.show({
                        description: "Falha ao registrar usuário.",
                        status: "error",
                        duration: 3000
                    });
                    console.error(error);
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <VStack space={5} alignItems="center" justifyContent="center" mt="5%" px="5%">
                    <Text fontSize="2xl" bold color="coolGray.800">Sign Up</Text>
                    <Box w="85%" maxW="300px">
                        <Input
                            placeholder="Nome"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="person" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.name && errors.name && <Text color="danger.600" fontSize="xs">{errors.name}</Text>}
                        <Input
                            placeholder="Sobrenome"
                            onChangeText={handleChange('surName')}
                            onBlur={handleBlur('surName')}
                            value={values.surName}
                            fontSize="md"
                            py="3"
                            w="full"
                            //InputLeftElement={<Icon as={MaterialIcons} name="person_outline" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.surName && errors.surName && <Text color="danger.600" fontSize="xs">{errors.surName}</Text>}
                        <Input
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="email" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.email && errors.email && <Text color="danger.600" fontSize="xs">{errors.email}</Text>}
                        <Input
                            placeholder="Senha"
                            onChangeText={handleChange('pwd')}
                            onBlur={handleBlur('pwd')}
                            value={values.pwd}
                            type="password"
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="lock" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.pwd && errors.pwd && <Text color="danger.600" fontSize="xs">{errors.pwd}</Text>}
                        <Input
                            placeholder="Documento"
                            onChangeText={handleChange('regNum')}
                            onBlur={handleBlur('regNum')}
                            value={values.regNum}
                            fontSize="md"
                            py="3"
                            w="full"
                            //InputLeftElement={<Icon as={MaterialIcons} name="confirmation_number" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.regNum && errors.regNum && <Text color="danger.600" fontSize="xs">{errors.regNum}</Text>}
                        <Input
                            placeholder="CEP"
                            onChangeText={handleChange('cep')}
                            onBlur={() => handleCepBlur(handleBlur, values.cep, setFieldValue)}
                            value={values.cep}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="home" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.cep && errors.cep && <Text color="danger.600" fontSize="xs">{errors.cep}</Text>}
                        <Input
                            placeholder="Estado"
                            onChangeText={handleChange('state')}
                            onBlur={handleBlur('state')}
                            value={values.state}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="location-city" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.state && errors.state && <Text color="danger.600" fontSize="xs">{errors.state}</Text>}
                        <Input
                            placeholder="Cidade"
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="location-city" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.city && errors.city && <Text color="danger.600" fontSize="xs">{errors.city}</Text>}
                        <Input
                            placeholder="Bairro"
                            onChangeText={handleChange('neighborhood')}
                            onBlur={handleBlur('neighborhood')}
                            value={values.neighborhood}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="location-city" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.neighborhood && errors.neighborhood && <Text color="danger.600" fontSize="xs">{errors.neighborhood}</Text>}
                        <Input
                            placeholder="Rua"
                            onChangeText={handleChange('street')}
                            onBlur={handleBlur('street')}
                            value={values.street}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="location-on" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.street && errors.street && <Text color="danger.600" fontSize="xs">{errors.street}</Text>}
                        <Input
                            placeholder="Complemento"
                            onChangeText={handleChange('complement')}
                            onBlur={handleBlur('complement')}
                            value={values.complement}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="location-on" size="sm" m="2" color="muted.400" />}
                        />
                        <Input
                            placeholder="Numero"
                            onChangeText={handleChange('number')}
                            onBlur={handleBlur('number')}
                            value={values.number}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="location-on" size="sm" m="2" color="muted.400" />}
                        />
                    </Box>
                    <Checkbox value="agree-terms" colorScheme="blue" _text={{ fontSize: "sm" }} my="2">
                        Concordo com os Termos e Condições e Política de Privacidade
                    </Checkbox>
                    <Button onPress={handleSubmit} w="85%" maxW="300px" bg="primary.500" py="3" _text={{ color: "white" }}>
                        Inscrever-se
                    </Button>
                    <Link _text={{ fontSize: "sm", color: "blue.600" }} onPress={() => navigation.navigate('Login')}>
                        Tem uma conta? Conecte-se
                    </Link>
                </VStack>
            )}
        </Formik>
    );
};

export default SignUpScreen;
