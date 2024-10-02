import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';

function App() {
  const [ventana, setVentana] = useState('form');
  const [form, setForm] = useState({
    name: null,
    nameMistake: null,
    lastName: null,
    lastNameMistake: null,
    phone: null,
    phoneMistake: null,
    email: null,
    emailMistake: null,
    nameBusiness: null,
    businessMistake: null
  });

  const sendInfo = async () => {
    if(form.name && form.lastName && form.phone && form.email && form.nameBusiness){
      let body = {
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        nameBusiness: form.nameBusiness
      }
      axios.post('https://panelapicosta-production.up.railway.app/qr/new', body)
      .then(res => {
        console.log(res);
        if(res.status == 201){
          setVentana('exito');
        }else{
          setVentana('error');
        }
      })
      .catch(err =>{
        setVentana('error');
      })
    }else{
      !form.name ? setForm({...form, nameMistake:true}) :
      !form.lastName ? setForm({...form, lastNameMistake:true}) :
      !form.email ? setForm({...form, emailMistake:true}) :
      !form.phone ? setForm({...form, phoneMistake:true}) :
      !form.nameBusiness ? setForm({...form, businessMistake:true}) :null 

    }
  }
  return (
    <div className='DivGeneral'>
      {
        ventana == 'form' ?

        <div className='form'>
          <div className='headerIcon'>
            <img src="https://metalicascosta.com.co/assets/img/logo_metalicas_costa.png" alt="" />
          </div>
          <div className='formInputs'>
            <div className='inputsDivs'>
              <label htmlFor="">
                Nombre
              </label><br />
              <input type="text" onChange={(e) => {
                setForm({
                  ...form,
                  nameMistake:false,
                  name: e.target.value
                })
              }} />
              <span>{form.nameMistake ? 'Ingresa tu nombre, por favor' : null}</span>

            </div>
            <div className='inputsDivs'>
              <label htmlFor="">
                Apellido 
              </label><br />
              <input type="text"  onChange={(e) => {
                setForm({
                  ...form,
                  lastNameMistake: false,
                  lastName: e.target.value
                })
              }}  />
              <span>{form.lastNameMistake ? 'Ingresa tu apellido, por favor' : null}</span>

            </div>
            <div className='inputsDivs'>
              <label htmlFor="">
                Correo electronico
              </label><br />
              <input type="text" placeholder='ej: luisafernanda@hotmail.com'  onChange={(e) => {
                setForm({
                  ...form,
                  emailMistake:false,
                  email: e.target.value
                })
              }}  />
              <span>{form.emailMistake ? 'Ingresa tu correo eléctronico, por favor' : null}</span>

            </div>
            <div className='inputsDivs'>
              <label htmlFor="">
                Número de teléfono 
              </label><br />
              <input type="text"   onChange={(e) => {
                setForm({
                  ...form,
                  phoneMistake:false,
                  phone: e.target.value
                })
              }} />
              <span>{form.phoneMistake ? 'Ingresa un teléfono, por favor' : null}</span>

            </div>
            <div className='inputsDivs'>
              <label htmlFor="">
                Nombre de la empresa 
              </label><br />
              <input type="text"  onChange={(e) => {
                setForm({
                  ...form,
                  businessMistake:false,
                  nameBusiness: e.target.value
                })
              }}  /> 
              <span>{form.businessMistake ? 'Ingresa el nombre de la empresa, por favor' : null}</span>
            </div>
            <div className='inputsDivs'>
              <button onClick={() => sendInfo()}>
                  <span>Finalizar</span>
              </button>
            </div>
          </div>
        </div>
        : ventana == 'exito' ?
            <div className='exito'>
              <div className='img'>
                <img src="https://th.bing.com/th/id/OIP.oUEzkTPkAKq3HNCesBlZlAHaHa?rs=1&pid=ImgDetMain" alt="" />
              </div>
              <h1>¡Muchas gracias por confiar en nosotros!</h1>
            </div>
        :
          <div className='exito'>
            <div className='img'>
              <img src="https://th.bing.com/th/id/R.f94e5bd04a4aed7491f94655106469cc?rik=%2ftPpieNPz9qWmw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsad-face-emoji-transparent%2fsad-face-emoji-transparent-3.png&ehk=a6NgnqZImZ28IflZGSJaCFYeV48kiqR%2bBf06gyfpgeQ%3d&risl=&pid=ImgRaw&r=0" alt="" />
            </div>
            <h1>¡Ha ocurrido un error, intentalo más tarde!</h1>
          </div>
      }
    </div>
  )
}

export default App
