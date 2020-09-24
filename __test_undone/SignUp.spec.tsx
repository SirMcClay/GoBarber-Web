import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

const mockedApi = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../services/api', () => {
  return {
    api: () => ({
      post: mockedApi,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedApi.mockClear();
  });

  it('should be able to signUp', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/'));
  });

  // it('should not be able to sign-in with invalid credentials', async () => {
  //   const { getByPlaceholderText, getByText } = render(<SignIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  // });

  // it('should display an error if login fails', async () => {
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error();
  //   });

  //   const { getByPlaceholderText, getByText } = render(<SignIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() =>
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         type: 'error',
  //       }),
  //     ),
  //   );
  // });
});
