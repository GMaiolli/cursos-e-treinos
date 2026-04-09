using System;
using System.Collections.Generic;
using System.Text;

namespace Beecrowd.Ad_Hoc.Nivel_8_a_10

{

    internal class _2858___Tabuleiro_Infinito    {

        static void Main()

        {

            // E*x + D*y = 1 ou -1// // int[] entrada = Console.ReadLine().Split().Select(int.Parse).ToArray();

            int D = entrada[0];

            int E = entrada[1];

            var result = ExtendedGCD(D, E);

            if (result.gcd == 1)

            {

                Console.WriteLine($"Solução: {Math.Abs(result.x) + Math.Abs(result.y)}");

            }

            else            {

                Console.WriteLine("Sem solução");

            }

        }

        static (int x, int y, int gcd) ExtendedGCD(int a, int b)

        {

            int old_r = a, r = b;

            int old_s = 1, s = 0;

            int old_t = 0, t = 1;


            while (r != 0)

            {

                int q = old_r / r;


                int temp = r;

                r = old_r - q * r;

                old_r = temp;


                temp = s;

                s = old_s - q * s;

                old_s = temp;


                temp = t;

                t = old_t - q * t;

                old_t = temp;

            }


            return (old_s, old_t, old_r);

        }

    }

}