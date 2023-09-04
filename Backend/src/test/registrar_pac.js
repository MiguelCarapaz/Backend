import { registrarPaciente } from '../models/paciente_controller.js';
import Paciente from '../models/Paciente'; 
import mongoose from 'mongoose';

// Mock de datos para el paciente
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


const mockReq = {
  body: mockPaciente,
};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Prueba unitaria
describe('registrarPaciente', () => {
  it('debería registrar un paciente correctamente', async () => {
    // Simula la creación de un nuevo paciente
    const mockPacienteGuardado = { ...mockPaciente, _id: mongoose.Types.ObjectId() };
    Paciente.prototype.save = jest.fn().mockResolvedValue(mockPacienteGuardado);

    await registrarPaciente(mockReq, mockRes);

    // Verifica que se haya creado y guardado el paciente correctamente
    expect(Paciente.prototype.save).toHaveBeenCalled();

    // Verifica que se haya respondido con un mensaje de registro exitoso
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Registro exitoso del paciente' });
  });

  it('debería responder con error 400 si faltan campos en la solicitud', async () => {
    // Simula una solicitud con campos faltantes
    mockReq.body = {};

    await registrarPaciente(mockReq, mockRes);

    // Verifica que se haya respondido con error 400
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debes llenar todos los campos' });
  });
});

