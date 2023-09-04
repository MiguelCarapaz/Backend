import { eliminarPaciente } from '../models/paciente_controller.js';
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
  params: {
    id: mockPaciente._id,
  },
  body: { salida: '2023-09-05T00:00:00.000Z' },
};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Prueba unitaria
describe('eliminarPaciente', () => {
  it('debería registrar la fecha de salida del paciente correctamente', async () => {
    // Simula la actualización de la fecha de salida del paciente
    Paciente.findByIdAndUpdate = jest.fn();

    await eliminarPaciente(mockReq, mockRes);

    // Verifica que la función de actualización se haya llamado con los parámetros correctos
    expect(Paciente.findByIdAndUpdate).toHaveBeenCalledWith(mockReq.params.id, {
      salida: Date.parse(mockReq.body.salida),
      estado: false,
    });

    // Verifica que se haya respondido con un mensaje de registro exitoso
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Fecha de salida del paciente registrada exitosamente' });
  });

  it('debería responder con error 400 si faltan campos en la solicitud', async () => {
    // Simula una solicitud con campos faltantes
    mockReq.body = {};

    await eliminarPaciente(mockReq, mockRes);

    // Verifica que se haya respondido con error 400
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debes llenar todos los campos' });
  });

  it('debería responder con error 404 si el ID no es válido', async () => {
    // Simula un ID no válido
    mockReq.params.id = 'ID_NO_VALIDO';

    await eliminarPaciente(mockReq, mockRes);

    // Verifica que se haya respondido con error 404
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: `Lo sentimos, no existe el veterinario ${mockReq.params.id}`,
    });
  });
});
