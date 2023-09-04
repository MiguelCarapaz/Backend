// Importa las funciones y módulos necesarios para las pruebas
import {
  login,
  perfil,
  registro,
  confirmEmail,
  listarVeterinarios,
  detalleVeterinario,
  actualizarPerfil,
  actualizarPassword,
  recuperarPassword,
  comprobarTokenPasword,
  nuevoPassword
  } from '../models/Veterinario_controler.js';
  
  // Mock de datos de prueba
  const mockReq = {
    body: {},
    params: {},
  };
  
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  
  // Prueba para la función login
  describe('login', () => {
    it('debería autenticar al usuario y devolver un token', async () => {
      // Configura el estado esperado para la prueba
      mockReq.body.email = 'usuario@ejemplo.com';
      mockReq.body.password = 'contraseñaSecreta';
  
      // Llama a la función y espera una respuesta
      await login(mockReq, mockRes);
  
      // Verifica que la función haya respondido correctamente
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });
  
    it('debería devolver un mensaje de error si las credenciales son incorrectas', async () => {
      // Configura el estado esperado para la prueba
      mockReq.body.email = 'usuario@ejemplo.com';
      mockReq.body.password = 'contraseñaIncorrecta';
  
      // Llama a la función y espera una respuesta
      await login(mockReq, mockRes);
  
      // Verifica que la función haya respondido con un mensaje de error
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, el password no es el correcto' });
    });
  
  });
  
  // Prueba para la función registro
  describe('registro', () => {
    it('debería registrar un nuevo usuario y enviar un correo de confirmación', async () => {
      // Configura el estado esperado para la prueba
      mockReq.body.email = 'nuevo_usuario@ejemplo.com';
      mockReq.body.password = 'contraseñaSegura';
  
      // Llama a la función y espera una respuesta
      await registro(mockReq, mockRes);
  
      // Verifica que la función haya respondido correctamente
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Revisa tu correo electrónico para confirmar tu cuenta' });
    });
  
    it('debería devolver un mensaje de error si el correo ya está registrado', async () => {
      // Configura el estado esperado para la prueba
      mockReq.body.email = 'usuario_existente@ejemplo.com';
      mockReq.body.password = 'nueva_contraseña';
  
      // Llama a la función y espera una respuesta
      await registro(mockReq, mockRes);
  
      // Verifica que la función haya respondido con un mensaje de error
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, el email ya se encuentra registrado' });
    });
  
  });
  
  // Prueba para la función confirmEmail
  describe('confirmEmail', () => {
    it('debería confirmar la cuenta de usuario con un token válido', async () => {
      // Configura el estado esperado para la prueba
      mockReq.params.token = 'token_valido';
  
      // Llama a la función y espera una respuesta
      await confirmEmail(mockReq, mockRes);
  
      // Verifica que la función haya respondido correctamente
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Token confirmado, ya puedes iniciar sesión' });
    });
  
    it('debería devolver un mensaje de error si el token no es válido', async () => {
      // Configura el estado esperado para la prueba
      mockReq.params.token = 'token_invalido';
  
      // Llama a la función y espera una respuesta
      await confirmEmail(mockReq, mockRes);
  
      // Verifica que la función haya respondido con un mensaje de error
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'La cuenta ya ha sido confirmada' });
    });
  });
  