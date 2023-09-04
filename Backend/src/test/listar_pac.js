import { listarPacientes } from '../models/paciente_controller.js';
import Paciente from '../models/Paciente'; 
import mongoose from 'mongoose';

const mockPaciente = {
    _id: mongoose.Types.ObjectId(),
    nombre: 'Rocky',
    propietario:'PEPE',
    email:'Pepe@gmail.com',
    celular:'0999999999',
    convencional:'0222222',
    ingreso:'03/09/2023',
    sintomas: 'Fiebre y mareo',
    salida:'04/09/2023',
    estado:'true',
    veterinario: mongoose.Types.ObjectId()
  };
  
// Mock de la solicitud y respuesta de Express
const mockReq = {
    veterinarioBDD: '1', // Reemplaza con el ID correcto
  };
  
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  
  // Prueba unitaria
  describe('listarPacientes', () => {
    it('debería listar pacientes correctamente', async () => {
      // Simula la función de búsqueda de pacientes
      Paciente.find = jest.fn().mockResolvedValue([mockPaciente]);
  
      await listarPacientes(mockReq, mockRes);
  
      // Verifica que la función de búsqueda se haya llamado con los parámetros correctos
      expect(Paciente.find).toHaveBeenCalledWith({
        estado: true,
        veterinario: mockReq.veterinarioBDD,
      });
  
      // Verifica que se haya respondido con el paciente
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([mockPaciente]);
    });
  });
  