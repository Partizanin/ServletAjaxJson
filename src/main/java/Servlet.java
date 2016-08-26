import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created with Intellij IDEA.
 * Project name: ServletAjaxJson.
 * Date: 26.08.2016.
 * Time: 14:58.
 * To change this template use File|Setting|Editor|File and Code Templates.
 */
@WebServlet(name = "CalcServlet", urlPatterns = "/CalcServlet")

public class Servlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/plain; charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();


        JSONObject catchObject = new JSONObject();
        JSONObject sendObject = new JSONObject();
        String requestValue = "";


        try {
            catchObject = new JSONObject(request.getParameter("jsonData"));
            catchObject = catchObject.getJSONObject("jsonData");
            double result = counter(catchObject);

            sendObject.put("result", result);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        writer.println(sendObject);
        writer.flush();
    }

    private double counter(JSONObject catchObject) {

        double result = 0;

        try {

            String operationCall = catchObject.getString("operation");

            JSONObject data = catchObject.getJSONObject("data");

            double number1 = data.getDouble("number1");

            double number2 = data.getDouble("number2");

            switch (operationCall) {
                case "+":
                    result = plus(number1, number2);
                    break;
                case "-":
                    result = minus(number1, number2);
                    break;
                case "/":
                    result = divide(number1, number2);
                    break;
                default:
                    result = multiply(number1, number2);
                    break;
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }


        return result;
    }

    private double multiply(double number1, double number2) {

        return number1 * number2;

    }

    private double divide(double number1, double number2) {

        return number1 / number2;

    }

    private double minus(double number1, double number2) {
        return number1 - number2;

    }

    private double plus(double number1, double number2) {
        return number1 + number2;
    }
}
