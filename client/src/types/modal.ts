import { TypeModal } from "../App";
import { IContact } from "./contact";

export interface ContentModalProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    typeMod: TypeModal;
    errorValidate: string | null;
    selectContact: IContact | null;
}