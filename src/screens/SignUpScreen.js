import React, { useState } from 'react';
import { VStack, Input, Button, Checkbox, Icon, Text, Link, Box, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api'; // Certifique-se que o caminho está correto

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [regNum, setRegNum] = useState('');
    const navigation = useNavigation();
    const toast = useToast();

    const handleSignUp = async () => {
        try {
            const userData = {
                name,
                surName,
                email,
                pwd,
                regNum
            };
            await registerUser(userData);
            toast.show({
                description: "User registered successfully.",
                status: "success",
                duration: 3000
            });
            navigation.navigate('Login');
        } catch (error) {
            toast.show({
                description: "Failed to register user.",
                status: "error",
                duration: 3000
            });
            console.error(error);
        }
    };

    return (
        <VStack space={5} alignItems="center" justifyContent="center" mt="5%" px="5%">
            <Text fontSize="2xl" bold color="coolGray.800">Sign Up</Text>
            <Box w="85%" maxW="300px">
                <Input
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    fontSize="md"
                    py="3"
                    w="full"
                    InputLeftElement={<Icon as={MaterialIcons} name="person" size="sm" m="2" color="muted.400" />}
                />
                <Input
                    placeholder="Sobrenome"
                    value={surName}
                    onChangeText={setSurName}
                    fontSize="md"
                    py="3"
                    w="full"
                    InputLeftElement={<Icon as={MaterialIcons} name="person_outline" size="sm" m="2" color="muted.400" />}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    fontSize="md"
                    py="3"
                    w="full"
                    InputLeftElement={<Icon as={MaterialIcons} name="email" size="sm" m="2" color="muted.400" />}
                />
                <Input
                    placeholder="Senha"
                    value={pwd}
                    onChangeText={setPwd}
                    type="password"
                    fontSize="md"
                    py="3"
                    w="full"
                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size="sm" m="2" color="muted.400" />}
                />
                <Input
                    placeholder="Documento"
                    value={regNum}
                    onChangeText={setRegNum}
                    fontSize="md"
                    py="3"
                    w="full"
                    InputLeftElement={<Icon as={MaterialIcons} name="confirmation_number" size="sm" m="2" color="muted.400" />}
                />
                <Checkbox value="agree-terms" colorScheme="blue" _text={{ fontSize: "sm" }} my="2">
                    Concordo com os Termos e Condições e Política de Privacidade
                </Checkbox>
            </Box>
            <Button onPress={handleSignUp} w="85%" maxW="300px" bg="primary.500" py="3" _text={{ color: "white" }}>
                Inscrever-se
            </Button>
            <Link _text={{ fontSize: "sm", color: "blue.600" }} onPress={() => navigation.navigate('Login')}>
                Ter uma conta? Conecte-se
            </Link>
        </VStack>
    );
};

export default SignUpScreen;