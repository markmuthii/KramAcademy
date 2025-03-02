import { Response } from "express";
import jwt from "jsonwebtoken";
import zlib from "zlib";

import { IAPIResponse, IJWTUser } from "@/types";
import { ISPROD, JWT_SECRET, PRODUCTION_DOMAIN } from "@/constants";

export const respond = <T>(
  res: Response,
  data: T,
  status: number = 200,
  success: boolean = true
) => {
  const response: IAPIResponse<T> = {
    success,
    data,
  };

  return res.status(status).json(response);
};

export const generateCompressedJWT = (token: string) => {
  return new Promise((resolve, reject) => {
    zlib.gzip(token, (err, compressedToken) => {
      if (err) {
        return reject(err);
      }

      resolve(compressedToken.toString("base64"));
    });
  }) as Promise<string>;
};

export const decompressJWT = (compressedToken: string) => {
  return new Promise((resolve, reject) => {
    const token = Buffer.from(compressedToken, "base64");

    zlib.gunzip(token, (err, decompressedToken) => {
      if (err) {
        return reject(err);
      }

      resolve(decompressedToken.toString());
    });
  }) as Promise<string>;
};

// TODO: Update this function to work with any kind of JWT payload, not just IJWTUser
export const generateJWT = async (
  user: IJWTUser,
  compressed: boolean = false
) => {
  const token = jwt.sign({ user }, JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return compressed ? await generateCompressedJWT(token) : token;
};

// TODO: Update this function to work with any kind of JWT payload, not just IJWTUser
export const verifyJWT = (token: string, compressed: boolean = false) => {
  return new Promise((resolve, reject) => {
    const jwtToken: Promise<string> = compressed
      ? decompressJWT(token)
      : Promise.resolve(token);

    jwtToken
      .then((token) => {
        jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
          if (err) {
            return reject(err);
          }

          resolve(decoded as IJWTUser);
        });
      })
      .catch(reject);
  }) as Promise<IJWTUser>;
};

export const setCookie = (res: Response, name: string, value: string) => {
  res.cookie(name, value, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "none",
    secure: ISPROD,
    domain: ISPROD ? `.${PRODUCTION_DOMAIN}` : undefined,
  });
};
