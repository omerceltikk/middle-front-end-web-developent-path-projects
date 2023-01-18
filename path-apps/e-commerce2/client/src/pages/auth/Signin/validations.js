import * as yup from "yup";

const validations = yup.object().shape({
    email: yup.string().email("Geçerli Bir E-mail Giriniz.").required("Zorunlu Alan."),
    password: yup.string().min(8, "Parolanız En Az 8 Karakter Olmalıdır.").required(),
});
export default validations