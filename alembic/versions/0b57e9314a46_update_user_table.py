"""Update user table

Revision ID: 0b57e9314a46
Revises: 4a827bfee018
Create Date: 2024-03-18 09:29:43.884026

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0b57e9314a46'
down_revision: Union[str, None] = '4a827bfee018'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('user', sa.Column('username', sa.String(length=100), server_default=sa.text("'No name given'"), nullable=False))


def downgrade() -> None:
    pass
