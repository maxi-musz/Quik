"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const [isloading, setIsLoading ] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            fullname: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            verifyPassword: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)

        .then(() =>{
            registerModal.onClose();
        })
        .catch((error) => {
            toast.error("Something went wrong")
        })
        .finally(() =>  {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
            title="Welcome to Quik"
            subtitle="create your account to sell your goods faster💨, or buy fairly used and new products at best prices🔥"
            />

            {/* NAME */}
            <Input 
            id="name"
            label="Name"
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />

            {/* EMAIL */}
            <Input 
            id="email"
            label="Email"
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />

            {/* PASSWORD */}
            <Input 
            id="password"
            label="Password"
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />

            {/* VERIFY */}
            <Input 
            id="verifyPassword"
            label="Verify password"
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <hr />
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
            />

            <div className="justify-center text-neutral-500 items-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div> 
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Sign in
                    </div> 
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal
        disabled={isloading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Proceed to register"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default RegisterModal;