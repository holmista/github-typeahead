import './App.css'

export default function InputField({onChange}) {
  return (
      <div className='input-wrapper'>
          <input placeholder='start searching...' onChange={onChange}/>
          <div>🔍</div>
      </div>
  )
}
