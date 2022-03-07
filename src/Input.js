import './App.css'

export default function InputField({onChange, reference}) {
  return (
      <div className='input-wrapper'>
          <input placeholder='start searching...' onChange={onChange} ref={reference}/>
          <div>🔍</div>
      </div>
  )
}
