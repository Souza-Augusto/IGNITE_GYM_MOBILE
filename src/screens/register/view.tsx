import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useTheme,
} from 'native-base';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useRegisterViewModel } from './view-model';

export function Register() {
  const {
    handleShowPassword,
    visiblePasswords,
    control,
    errors,
    handleGoBack,
    handleSignUp,
    handleSubmit,
    isLoading,
  } = useRegisterViewModel();

  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='contain'
          position='absolute'
        />

        <Center my={24}>
          <LogoSvg />

          <Text color='gray.100' fontSize='sm'>
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry={visiblePasswords.password}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                rightElement={
                  <TouchableOpacity
                    onPress={() => handleShowPassword('password')}
                    activeOpacity={0.5}
                  >
                    {visiblePasswords.password ? (
                      <Ionicons
                        style={{ marginRight: 12 }}
                        name='eye-off'
                        size={20}
                        color={colors.gray[300]}
                      />
                    ) : (
                      <Ionicons
                        style={{ marginRight: 12 }}
                        name='eye'
                        size={20}
                        color={colors.gray[300]}
                      />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />

          <Controller
            control={control}
            name='password_confirmation'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmar a Senha'
                secureTextEntry={!visiblePasswords.password_confirmation}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                errorMessage={errors.password_confirmation?.message}
                rightElement={
                  <TouchableOpacity
                    onPress={() => handleShowPassword('password_confirmation')}
                    activeOpacity={0.5}
                  >
                    {visiblePasswords.password_confirmation ? (
                      <Ionicons
                        style={{ marginRight: 12 }}
                        name='eye-off'
                        size={20}
                        color={colors.gray[300]}
                      />
                    ) : (
                      <Ionicons
                        style={{ marginRight: 12 }}
                        name='eye'
                        size={20}
                        color={colors.gray[300]}
                      />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title='Voltar para o login'
          variant='outline'
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
