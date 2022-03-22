import { TypeModal } from "../App";

export interface IContact {
    phone: string,
    username: string
    id?: number
}

export interface ModalProps {
    typeModal: TypeModal;
    selectContact: IContact | null;
    setTypeModal: React.Dispatch<React.SetStateAction<TypeModal | null>>;
}