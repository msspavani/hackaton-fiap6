import { useFormik } from 'formik';
import * as Yup from 'yup';


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


const medicoSchema = Yup.object({
  nome: Yup.string().required('Nome é obrigatório'),
  especialidade: Yup.string().required('Especialidade é obrigatório'),
  crm: Yup.string().required('CRM é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  telefone: Yup.string().required('Telefone obrigatório'),
  cpf: Yup.string().nullable(),
  nascimento: Yup.date().required('Data de nascimento é obrigatória'),
  endereco: Yup.string().required('Endereço é obrigatório'),


});




export function MedicoForm() {
  const formik = useFormik({
    initialValues: {
      nome: '',
      especialidade: '',
      crm: '',
      email: '',
      telefone: '',
      cpf: '',
      nascimento: '',
      endereco: '',
    },
    validationSchema: medicoSchema,
    onSubmit: async (values) => {
      try{
        const response = await fetch(`${apiBaseUrl}/medicos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(values),
        });

        if(!response.ok) throw new Error('Erro ao cadastrar médico');

        alert('Médico cadastrado com sucesso!');
        formik.resetForm();
      }
      catch(error)
      {
        alert('Falha ao enviar dados: ' + error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Médico</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input name="nome" 
                 placeholder="Nome completo" 
                 onChange={formik.handleChange} 
                 value={formik.values.nome} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formik.touched.nome && formik.errors.nome && (
                  <p className='text-red-500 text-sm'>{formik.errors.nome}</p>
                 )}

          <input name="especialidade" 
                 placeholder="Especialidade" 
                 onChange={formik.handleChange} 
                 value={formik.values.especialidade} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {formik.touched.especialidade && formik.errors.especialidade && (
                  <p className='text-red-500 text-sm'>{formik.errors.especialidade}</p>
                 )}

          <input name="crm" 
                 placeholder="CRM" 
                 onChange={formik.handleChange} 
                 value={formik.values.crm} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formik.touched.crm && formik.errors.crm && (
                  <p className='text-red-500 text-sm'>{formik.errors.crm}</p>
                 )}

          <input name="email" 
                 type="email" 
                 placeholder="E-mail" 
                 onChange={formik.handleChange} 
                 value={formik.values.email} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formik.touched.email && formik.errors.email && (
                  <p className='text-red-500 text-sm'>{formik.errors.email}</p>
                 )}

          <input name="telefone" 
                 placeholder="Telefone" 
                 onChange={formik.handleChange} 
                 value={formik.values.telefone} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {formik.touched.telefone && formik.errors.telefone && (
                  <p className='text-red-500 text-sm'>{formik.errors.telefone}</p>
                 )}


          <input name="cpf" 
                 placeholder="CPF (opcional)" 
                 onChange={formik.handleChange} 
                 value={formik.values.cpf} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formik.touched.cpf && formik.errors.cpf && (
                  <p className='text-red-500 text-sm'>{formik.errors.cpf}</p>
                 )}


          <label htmlFor="nascimento">Data de nascimento</label>
          <input name="nascimento" 
                 id="nascimento"
                 type="date" 
                 onChange={formik.handleChange} 
                 value={formik.values.nascimento} 
                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 {formik.touched.nascimento && formik.errors.nascimento && (
                  <p className='text-red-500 text-sm'>{formik.errors.nascimento}</p>
                 )}



          <input name="endereco" 
                 placeholder="Endereço completo" 
                 onChange={formik.handleChange} 
                 value={formik.values.endereco} className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {formik.touched.endereco && formik.errors.endereco && (
                  <p className='text-red-500 text-sm'>{formik.errors.endereco}</p>
                 )}


          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
