import { useToast } from 'native-base';
import { RegisterSchema, registerSchema } from './schema';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

interface TogglePasswordProps {
  password: boolean;
  password_confirmation: boolean;
}

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegisterViewModelProps {
  control: Control<FormDataProps, any>;
  handleSubmit: UseFormHandleSubmit<FormDataProps>;
  errors: FieldErrorsImpl<FormDataProps>;
  isLoading: boolean;
  handleSignUp: (value: FormDataProps) => void;
  handleGoBack: () => void;
  handleShowPassword: (field: 'password' | 'password_confirmation') => void;
  visiblePasswords: TogglePasswordProps;
}

function useRegisterViewModel(): RegisterViewModelProps {
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<TogglePasswordProps>(
    {
      password: true,
      password_confirmation: true,
    }
  );

  const toast = useToast();
  const { singIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    },
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleShowPassword(field: 'password' | 'password_confirmation') {
    setVisiblePasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      await api.post('/users', { name, email, password });
      await singIn(email, password);
    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return {
    control,
    errors,
    handleGoBack,
    handleSignUp,
    handleSubmit,
    isLoading,
    handleShowPassword,
    visiblePasswords,
  };
}

export { useRegisterViewModel };
