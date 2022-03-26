import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { client } from "../../prisma/client";

interface IRequest{
    username: string;
    password: string;
}

class AuthenticateUserUseCase{
    async execute({username, password}: IRequest){

        const userAlreadExists = await client.user.findFirst({
            where: {
                username,
            }
        });

        if (!userAlreadExists) {
            throw new Error("User or password incorrect")
        }

        const passwordMatch = await compare(password, userAlreadExists.password)

        if (!passwordMatch){
            throw new Error("User or password incorrect")
        }

        const token = sign({}, "c152e7bb-ec71-4918-8275-8aa786206b2a", {
            subject: userAlreadExists.id,
            expiresIn: "20s",
        });

        return { token };

    }
}

export {AuthenticateUserUseCase}