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
            console.log(error)
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

            {/* FULL NAME */}
            <Input 
            id="name"
            label="Full Name"
            disabled={isloading}
            register={register}
            errors={errors}
            required
            />

            {/* USERNAME */}
            <Input 
            id="username"
            label="Username"
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

            {/* PHONE */}
            <Input 
            id="phone"
            label="Phone"
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

    return ( 
        <Modal
        disabled={isloading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Proceed to register"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        />
     );
}
 
export default RegisterModal;