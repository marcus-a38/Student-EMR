export default function Result({ json }) {
  return(
    <div className='result'>
      <a href='/view'>
        { json.last_name },&nbsp;{ json.first_name }
      </a>
      <small>
        Age:&nbsp;{ json.age }&nbsp;|&nbsp;Gender:&nbsp;{ json.gender }
      </small>
    </div>
  );
}