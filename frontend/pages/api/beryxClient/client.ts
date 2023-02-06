import { Beryx } from '@zondax/beryx';

export const jwt: string = process.env.NEXT_PUBLIC_JWT_TOKEN || '';

export const CLIENT = new Beryx.Filecoin({ jwt, network: 'hyperspace' });


