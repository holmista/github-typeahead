import './App.css'

export default function InputField({value, onChange}) {
  return (
      <div className='input-wrapper'>
          <input placeholder='start searching...' value={value} onChange={onChange}/>
          <div>🔍</div>
      </div>
  )
}
