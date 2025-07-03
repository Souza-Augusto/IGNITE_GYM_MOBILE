import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import { useToast } from 'native-base';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  useForm,
} from 'react-hook-form';
import { LoginSchema, loginSchema } from './schema';

type FormData = {
  email: string;
  password: string;
};

interface LoginViewModelProps {
  control: Control<FormData, any>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  errors: FieldErrorsImpl<{
    email: string;
    password: string;
  }>;
  isLoading: boolean;
  handleNewAccount: () => void;
  handleSignIn: ({ email, password }: FormData) => void;
}

function useLoginViewModel(): LoginViewModelProps {
  const [isLoading, setIsLoading] = useState(false);

  const { singIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toas = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function handleNewAccount() {
    navigation.navigate('register');
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.';

      toas.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
      setIsLoading(false);
    }
  }
  return {
    control,
    errors,
    handleSubmit,
    isLoading,
    handleNewAccount,
    handleSignIn,
  };
}

export { useLoginViewModel };
