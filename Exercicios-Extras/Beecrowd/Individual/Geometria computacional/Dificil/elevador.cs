using System;

class Program
{
    static void Main()
    {
        string input;

        while ((input = Console.ReadLine()) != null)
        {
            string[] valores = input.Split(' ');
            int L = int.Parse(valores[0]);
            int C = int.Parse(valores[1]);
            int R1 = int.Parse(valores[2]);
            int R2 = int.Parse(valores[3]);

            if (L == 0 && C == 0 && R1 == 0 && R2 == 0)
                break;

            if (R1 * 2 > L || R1 * 2 > C || R2 * 2 > L || R2 * 2 > C)
            {
                Console.WriteLine("N");
            } else
            {
                int T = R1 + R2;
                double DC = Math.Pow(L - R1 - R2, 2) + Math.Pow(C - R1 - R2, 2);
                double SR = Math.Pow(R1 + R2, 2);

                if (DC >= SR)
                {
                    Console.WriteLine("S");
                }
                else
                {
                    Console.WriteLine("N");
                }
                
            }

        }
    }
}