# Git Collaboration Guide (You + Friend)

## Step 1: Push Project to GitHub (Do this once)
1. Go to [github.com/new](https://github.com/new)
2. Create repository name: `land-ownership-transfer` (set to Public or Private, DO NOT initialize with README).
3. In your VS Code terminal, run:
```bash
git remote add origin https://github.com/<YOUR-USERNAME>/land-ownership-transfer.git
git push -u origin main
```

## Step 2: Add Friend as Collaborator
1. On GitHub repo page: click **Settings** → **Collaborators** → **Add people**.
2. Type friend's GitHub username/email and send invite.
3. Friend accepts invitation link received via email or at [github.com/notifications](https://github.com/notifications).

## Step 3: Friend Clones Repo
On friend's computer:
```bash
git clone https://github.com/<YOUR-USERNAME>/land-ownership-transfer.git
cd land-ownership-transfer
npm install
npm run dev
```

## Step 4: Golden Rule to Prevent Conflicts
Never both work on `main` branch directly.

### When Friend starts a task:
```bash
git checkout main
git pull origin main
git checkout -b feature/friend-task
```

### When Friend finishes:
```bash
git add .
git commit -m "Add feature XYZ"
git push origin feature/friend-task
```
Then create Pull Request on GitHub and merge into `main`.

### When You want latest changes:
```bash
git checkout main
git pull origin main
```
