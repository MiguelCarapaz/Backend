import { detallePaciente } from '../models/Paciente_controler';
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
};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Prueba unitaria
describe('detallePaciente', () => {
  it('debería obtener el detalle del paciente correctamente', async () => {
    // Simula la función de búsqueda de paciente por ID
    Paciente.findById = jest.fn().mockResolvedValue(mockPaciente);

    await detallePaciente(mockReq, mockRes);

    // Verifica que la función de búsqueda por ID se haya llamado con el ID correcto
    expect(Paciente.findById).toHaveBeenCalledWith(mockReq.params.id);

    // Verifica que se haya respondido con el paciente
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockPaciente);
  });

  it('debería responder con error 404 si el ID no es válido', async () => {
    // Simula un ID no válido
    mockReq.params.id = 'ID_NO_VALIDO';

    await detallePaciente(mockReq, mockRes);

    // Verifica que se haya respondido con error 404
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: `Lo sentimos, no existe el veterinario ${mockReq.params.id}`,
    });
  });
});
