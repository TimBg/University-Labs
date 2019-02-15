#undef __STRICT_ANSI__
#define _USE_MATH_DEFINES
#include <cmath>

double S(double x, double epsilon) noexcept{
    int k = 0;
    double a = x * x / 2.;
    double s = 0;
    double x2 = x * x * x;
    while (abs(a) >= epsilon) {
        s += a;
        ++k;
        a *= x2 / (3. * k * (3. * k + 1.) * (3. * k + 2.));
    }
    return s += a;
}

double f(double x){
    return (1. / 3) * pow(M_E, x) - (2. / 3) * pow(M_E, -x / 2) * cos((sqrt(3.) / 2. * x - M_PI / 3.));
}

