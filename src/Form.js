import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup'


const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
        <>
              <label htmlFor={props.name}>{label}</label>
                <Field
                   {...props}
                   {...field}
                />
                  {meta.touched && meta.error ?  (<div className='error'>{meta.error}</div>) : null}

        </>
    )
}   
const MyTextInput2 = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});

    return(
        <>
              <label className="checkbox">
                    <Field
                     type="checkbox"
                    {...props}
                    {...field}
                    />
                    {children}
                </label>
                {meta.touched && meta.error ?  (<div className='error'>{meta.error}</div>) : null}

        </>
    )
}   

const MyTextInput3 = ({id, as, name, ...props}) => {
    const [field, meta] = useField({id, as, name});

    console.log(Object.values(props))

    let currencyArray = [Object.values(props)]

    return(
        <>
            <Field
                id="currency"
                as='select'
                name="currency">

             {currencyArray.map(el => (<option value ={el}>{el} </option>))}
        
            </Field>
            {meta.touched && meta.error ?  (<div className='error'>{meta.error}</div>) : null}
        </>
    )
}   


const Form1 = () => {
    return (
        <Formik 
        initialValues={{ 
            name: '',
            email: '',
            password: '',
            amount: '',
            currency: '',
            text: '',
            terms: false,
        }}
        validationSchema={Yup.object({
            name: Yup.string().min(2, 'min 2 character').required('Required'),
            email: Yup.string().email('invalid email adress').required('Required'),
            amount: Yup.string().min(5, 'min 5 character').required('Required'),
            currency: Yup.string().required('Required'),
            text: Yup.string().min(10, 'min 10 character'),
            terms: Yup.boolean().required().oneOf([true], 'Required')
        })}
        onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
        <Form className="form">
            <h2>Отправить пожертвование</h2>
             <MyTextInput 
                label='Ваше имя'
                id="name"
                name="name"
                type="text"
             />
            <MyTextInput 
                label='Ваша почта'
                id="email"
                name="email"
                type="email"
             />
            <MyTextInput 
                label='Сумма'
                id="amount"
                name="amount"
                type="number"
             />
            <label htmlFor="currency">Валюта</label>

            <Field
                id="currency"
                as='select'
                name="currency">
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </Field>
            <ErrorMessage component="div" name="currency"/>

            <MyTextInput3  
               id="currency"
               as='select'
               name="currency"
               currencyArray={'RUB, USD'}
               >

            </MyTextInput3>

            <label htmlFor="text">Ваше сообщение</label>
            <Field 
                id="text"
                name="text"
                as='textarea'
            />
            <ErrorMessage component="div" name="text"/>
            <MyTextInput2 name='terms'>
               Соглашаюсь с политикой конфедециальности
            </MyTextInput2 >
            <button type="submit">Отправить</button>
        </Form>
        </Formik>
    )
}

export default Form1;