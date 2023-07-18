import java.io.IOException;
import java.net.URL;
import java.util.Scanner;

public class ConversorMoneda {
    public static void main(String[] args) {
        // Solicitar al usuario ingresar el monto y la moneda base
        System.out.print("Ingrese el monto: ");
        Scanner scanner = new Scanner(System.in);
        double monto = scanner.nextDouble();
        System.out.print("Ingrese la moneda base: ");
        String monedaBase = scanner.next();
        System.out.print("Ingrese la moneda objetivo: ");
        String monedaObjetivo = scanner.next();

        try {
            // Obtener la tasa de conversión de alguna manera (por ejemplo, desde una API)
            double tasaConversion = obtenerTasaConversion(monedaBase, monedaObjetivo);

            // Calcular el monto convertido
            double montoConvertido = monto * tasaConversion;

            // Imprimir el resultado
            System.out.println("Monto convertido: " + montoConvertido + " " + monedaObjetivo);
        } catch (IOException e) {
            System.out.println("Error al obtener la tasa de conversión: " + e.getMessage());
        }
    }

    public static double obtenerTasaConversion(String monedaBase, String monedaObjetivo) throws IOException {
        String url = "https://api.exchangerate-api.com/v4/latest/" + monedaBase;

        try (Scanner scanner = new Scanner(new URL(url).openStream())) {
            String jsonResponse = scanner.useDelimiter("\\A").next();

            // Analizar la respuesta JSON
            double tasaConversion = Double.parseDouble(jsonResponse
                    .split("\"" + monedaObjetivo + "\":")[1]
                    .split(",")[0]);

            return tasaConversion;
        }
    }
}
