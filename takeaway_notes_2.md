# Lesson #2 Takeaways

## When a user logs in:

```
USER ———— email & password ——> API ENDPOINT (domain/api/auth/login)
```

They send the email & password to an API endpoint.

In our case, the domain is `localhost:8000`

This API is provided by the backend system, which we are building using Django & Django Rest Framework.

**Frontend code (Next.js):**
```typescript
// myschool_dashboard/lib/api.ts
const response = await api.post('/auth/login/', { email, password });
```

## The API does the following:

1. **Checks in the database if a user with that email exists** → if not, return an error

2. **Checks if the user with that email has that password** → if not, return an error

3. **If the email & password are correct** → return the auth_token

## API Response Codes

An API response typically includes a code that specifies the type of response.

Important codes we will see for now are:
- **200** – meaning the request was a success
- **401** – meaning the request was forbidden (this is what you will get when you send the wrong email and password)


## When the user signs up:

```
USER ———— email & password ——> API ENDPOINT (domain/api/auth/register)
```

The API does the following:

1. **Checks in the database if a user with that email already exists** → if they exist, return an error (something like "email taken"). Note: we are registering, so the user with that email should not already be created.

2. **If the email is not taken** → create the user and return the auth_token

## In both success cases (register/login):

Our client side app will store this token in local_storage.

**Frontend code:**
```typescript
// myschool_dashboard/app/components/login/LoginForm.tsx
localStorage.setItem("access_token", response.access);
```

From here on, whenever the user makes a request, an interceptor will check local storage, find the auth token, and attach it to the request.

**Frontend interceptor:**
```typescript
// myschool_dashboard/lib/api.ts
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

## Auth Token

- This token is **unique to every user**. It is not the same as user ID.
- Django manages the creation of the tokens, and refreshing them.
- Tokens have an expiry time, after which a new one is created.


---

## BACKEND

Django works with **apps**. Think of an app as basically a single feature of your website. Typically if it has a table for storing data, it is an app.

### For instance: Authentication

- We created this app which manages the user
- Internally it stores the user information in a table in our database
- We use the default database that comes with Django, which is a SQLite type

**Creating an app:**
```bash
python3 manage.py startapp authentication
```

**User model (defines the database table):**
```python
# authentication/models.py
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    # ... other fields
```

**Registering the app:**
```python
# backend/settings.py
INSTALLED_APPS = [
    # ...
    'authentication',  # Our custom app
]
```

---

## In the next class we will complete login by following a series of steps.


