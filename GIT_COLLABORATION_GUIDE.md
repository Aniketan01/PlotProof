# Git Collaboration Guide (You + Friend)

## Repository URL
`https://github.com/Aniketan01/Land-Ownership-Transfer.git`

## Step 1: Push Project to GitHub
Remote already configured to `origin`.
Run in terminal:
```bash
git push -u origin main
```

## Step 2: Add Friend as Collaborator
1. Open [https://github.com/Aniketan01/Land-Ownership-Transfer/settings/access](https://github.com/Aniketan01/Land-Ownership-Transfer/settings/access)
2. Click **Add people**.
3. Type friend's GitHub username/email and invite.

## Step 3: Friend Clones Repo
On friend machine:
```bash
git clone https://github.com/Aniketan01/Land-Ownership-Transfer.git
cd Land-Ownership-Transfer
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

