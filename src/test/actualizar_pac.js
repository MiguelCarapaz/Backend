import { actualizarPaciente } from '../models/paciente_controller.js';
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

const mockReq = {
  params: {
    id: mockPaciente._id,
  },
  body: { nombre: 'Pelusa' },
};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Prueba unitaria
describe('actualizarPaciente', () => {
  it('debería actualizar un paciente correctamente', async () => {
    // Simula la actualización de un paciente
    Paciente.findByIdAndUpdate = jest.fn();

    await actualizarPaciente(mockReq, mockRes);

    // Verifica que la función de actualización se haya llamado con los parámetros correctos
    expect(Paciente.findByIdAndUpdate).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);

    // Verifica que se haya respondido con un mensaje de actualización exitosa
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Actualización exitosa del paciente' });
  });

  it('debería responder con error 400 si faltan campos en la solicitud', async () => {
    // Simula una solicitud con campos faltantes
    mockReq.body = {};

    await actualizarPaciente(mockReq, mockRes);

    // Verifica que se haya respondido con error 400
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debes llenar todos los campos' });
  });

  it('debería responder con error 404 si el ID no es válido', async () => {
    // Simula un ID no válido
    mockReq.params.id = 'ID_NO_VALIDO';

    await actualizarPaciente(mockReq, mockRes);

    // Verifica que se haya respondido con error 404
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: `Lo sentimos, no existe el veterinario ${mockReq.params.id}`,
    });
  });
});
